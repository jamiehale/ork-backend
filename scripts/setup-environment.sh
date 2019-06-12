export DRUID_QUERY_HOST=`gcloud compute instances describe druid-query-1 | grep natIP | cut -d: -f 2 | tr -d " "`
export DRUID_MASTER_HOST=`gcloud compute instances describe druid-master-1 | grep natIP | cut -d: -f 2 | tr -d " "`
export KAFKA_HOST=`gcloud compute instances describe kafka-1 | grep natIP | cut -d: -f 2 | tr -d " "`
