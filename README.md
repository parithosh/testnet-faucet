## Testnet faucet

This Faucet is based on https://github.com/poanetwork/poa-faucet

### Building from source

1. Clone repository
  ```
  git clone https://github.com/parithosh/testnet-faucet
  ```
3. Sign-up for Google recaptcha in the admin portal [here](http://www.google.com/recaptcha/admin). For more info, [see](https://developers.google.com/recaptcha/docs/verify?hl=ru)
2. Edit and copy configuration examples
  ```
  cp config.server.json config.json
  cp config.ui.server.json public/config.json
  ```
4. Install dependencies `npm install` from the project's root
5. Run faucet with `npm start`. the faucet will be launched at `http://localhost:5001`

### Server config.json (`./config.json`)
```
{
  "environment": "switcher between configurations: 'prod' or 'dev'",
  "debug": "switch on/off server logs: true or false",
  "Captcha": {
    "secret": "reCaptcha plugin secret"
  },
  "Ethereum": {
    "chainId": 5,
    "etherToTransfer": "The number of milliEther to be sent from the faucet. For example, 500",
    "gasLimit": "Transaction gas limit, for example, 21000",
    "prod": {
      "rpc": "JSON RPC endpoint to send requests to",
      "account": "The address from which the funds will be drained",
      "privateKey": "Private key of the account"
    },
    "dev": {
      ...
    }
  }
}
```

### Web UI config.json (`./public/config.json`)
```
{
  "title": "Testnet faucet",
  "buttonText": "Request ETH",
  "logoUrl": "https://launchpad.ethereum.org/static/media/eth2-leslie-rhino.243747b9.png",
  "recaptchaKey": "reCaptcha plugin secret",
  "footer": "Some footer text"
}

```

## Configure using Docker
- We will have a local `config.server.json` and `config.ui.json` file that will overwrite the one in the docker image
- Configure your `config.server.json` file as shown above
- Configure your `config.ui.json` file as shown above
- Run the docker image with
  ```
  docker run --name faucet -d \
    -v ./config.server.json:/app/config.json \
    -v ./config.ui.json:/app/public/config.json \
    -p 5001:5001 parithoshj/testnet-faucet:latest
  ```
- Check `docker logs faucet` to see if its running correctly
