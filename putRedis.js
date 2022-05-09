const client = require('./redis');

const putRedis = async(request, response, data) => {

    client.select(1);
    client.exists(data.id).then(
            (reply) => {
                if (reply === 1) {
                    response.writeHead(201, {
                        "Content-Type": "application/json"
                    });
                    response.write(
                        JSON.stringify({
                            message: 'Duplicate data'
                        })
                    );

                    response.end();
                    console.log('data exists in redis');
                    console.log('id is duplicate')


                } else {
                    console.log('data not exists in redis!!!');
                    client.select(1);
                    client.set(data.id, data.data);
                    console.log("dataStorage update");
                    client.select(2);
                    client.set(data.id, data.parent);
                    console.log("dataMap update");
                    console.log("data are save")
                    response.writeHead(200, {

                        "Content-Type": "application/json"
                    });
                    response.write(
                        JSON.stringify({
                            message: "Data save",
                        })
                    );
                    response.end();

                }
            })
        .catch(
            (err) => {
                console.log("error in connect to redis");
            })

}



module.exports = putRedis;