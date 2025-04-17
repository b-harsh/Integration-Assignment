import clickhouse_connect 

def create_client(host , port , user , jwt_token  , database):
    client = clickhouse_connect.get_client(
        host = host,
        port = port,
        username = user,
        password = jwt_token,
        database = database
    )
    return client