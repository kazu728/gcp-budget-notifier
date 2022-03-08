import { IncomingWebhook } from '@slack/webhook'

export type PubsubEvent = {
  '@type': string
  attributes: {
    billingAccountId: string
    budgetId: string
    schemaVersion: string
  }
  data: string
}

export type Data = {
  budgetDisplayName: string
  costAmount: number
  costIntervalStart: string
  budgetAmount: number
  budgetAmountType: string
  currencyCode: string
}

export interface Publisher {
  publish(text: string): Promise<void>
}

export class Slack implements Publisher {
  async publish(text: string): Promise<void> {
    const url = process.env.WEBHOOK_URL
    if (!url) throw new Error('Not Found "WEBHOOK_URL"')

    await new IncomingWebhook(url).send({ text })
  }
}

export const parsePubSubMessage = (event: PubsubEvent): Data => {
  const decodedData: string = Buffer.from(event.data, 'base64').toString()
  return JSON.parse(decodedData)
}

export const generatePostingText = (data: Data): string => {
  const { budgetAmount, costAmount, costIntervalStart } = data
  return `Budget amount: ${budgetAmount}\nCost amount: ${costAmount}\nCost interval start: ${costIntervalStart}`
}

export const pubsubEventHandler = async (event: PubsubEvent): Promise<void> => {
  const data: Data = parsePubSubMessage(event)
  if (data.costAmount <= data.budgetAmount) return

  const postingText = generatePostingText(data)

  const publisher: Publisher = new Slack()
  await publisher.publish(postingText)
}
