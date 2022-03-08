# gcp-budget-notifier

Notification to slack GCP budget and how much I have spent.

## Usage

Please set your environment variable at `terraform.tfvars.json`, and `GOOGLE_APPLICATION_CREDENTIALS` before doing following things.

### Crating Pubsub topic

```
$ terraform init
$ terraform plan
$ terraform apply
```

### Function deploy

```
$ yarn compile && gcloud functions deploy pubsubEventHandler \
  --runtime nodejs16 \
  --trigger-topic=${TOPIC_NAME} \
  --set-env-vars WEBHOOK_URL=${YOUR_WEBHOOK_URL}
```
