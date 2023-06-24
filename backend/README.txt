docker-compose run -p 3000:3000 node ash

docker exec -it {id} ash

rm -rf node_modules/

docker-compose up -d

if (error.response.status === 400) {
    console.log(error.response.data.msg[0].msg);
    setErro(true);
    setMsgErro(error.response.data.msg[0].msg);
}