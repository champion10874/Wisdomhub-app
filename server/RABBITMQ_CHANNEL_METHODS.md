### RabbitMQ Channel Methods

* `channel.publish`
    * Publish a message to an exchange
* `channel.assertExchange`
    * Assets exchange into existence
* `channel.assertQueue`
    * Checks if a queue exists
    * If it does not exist, it creates a new queue
* `channel.bindQueue`
    * Assets a routing path from an exchange to a queue
* `channel.consume`
    * Set up a consumer with a callback to be invoked with each message
* `channel.ack`
    * Acknowledge the given message