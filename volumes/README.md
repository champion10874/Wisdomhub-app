1. go to elasticsearch_container:
2.

Run: `curl -s -X POST -u elastic:admin1234 -H "Content-Type: application/json" http://localhost:9200/_security/user/kibana_system/_password -d "{\"password\":\"kibana\"}"`

3. Press Enter and wait to see `{}` for success.
4. Type `cd..`
5. `bin/elasticsearch-service-tokens create elastic/kibana wisdomhub-kibana`
6. Copy the Token to ELASTICSEARCH_SERVICEACCOUNT_TOKEN variable on kibana container
7. Remove kibana container
8. Up again kibana container
9. Browse to: `localhost:5601`
10. Login with: `elastic;admin1234`
11. Build and Up Notification microservice