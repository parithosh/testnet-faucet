## Testnet faucet

This Faucet is based on https://github.com/poanetwork/poa-faucet

### Building from source

1. Clone repository
  ```
  git clone https://github.com/parithosh/testnet-faucet
  ```
2. Copy `config.json.example` to `config.json`
  ```
  cp config.json.example config.json
  ```
2. Update config.json `./config.json` (see config.json with placeholders below)
3. Sign-up for Google recaptcha in the admin portal [here](http://www.google.com/recaptcha/admin)
4. Update `./public/index.html`: Find `<div class="g-recaptcha" data-sitekey="type your reCaptcha plugin secret here"></div>` line and type your reCaptcha plugin secret in `data-sitekey` attribute. For more info, [see](https://developers.google.com/recaptcha/docs/verify?hl=ru)
5. Install dependencies `npm install` from the project's root
6. Run faucet with `npm start`. the faucet will be launched at `http://localhost:5001`

### Server config.json (`./config.json`) with placeholders
```
{
  "environment": "switcher between configurations: 'prod' or 'dev'",
  "debug": "switch on/off server logs: true or false",
  "Captcha": {
    "secret": "reCaptcha plugin secret"
  },
  "Ethereum": {
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

### Configure using environment variables

You can also configure things by using environment variables:

* `ACCOUNT` - Ethereum account to send fund from
* `KEY` - Private key for that account
* `RPC` - RPC endpoint to use

## Configure for testnets using docker
- We will have a local `config.json` and `index.html` file that will overwrite the one in the docker image
- Configure your `config.json` file as shown above
- Configure your `index.html` file as shown above
- Run the docker image with `docker run -d -v ./config.json:/app/config.json -v ./index.html:/app/public/index.html -p 5001:5001 parithoshj/testnet-faucet:v1.0.3`
- Check `docker logs <container name>` to see if its running correctly

### Caveats
- The faucet currently requires a JSON RPC with `--rpc.allow-unprotected-txs` enabled (in the case of geth). Otherwise
submitted tx'es will give you an error related to EIP-155.
