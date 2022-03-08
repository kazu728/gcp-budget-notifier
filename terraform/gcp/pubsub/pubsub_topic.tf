resource "google_pubsub_topic" "bill-management-topic-slack" {
  name    = var.topic_name
  project = var.project_id
}
