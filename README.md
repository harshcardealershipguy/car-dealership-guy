# Car Dealership Guy

## Running locally
make up-local

## Deploying
```
npm run deploy-staging
```

```
npm run deploy-prod
```

### SSHing into containers in ECS
```

aws ecs execute-command --cluster <cluster-name> \
    --task <task-id> \
    --container <container-name> \
    --interactive \
    --command "/bin/sh"
```

## Env Vars
### Local
**Frontend**
```
frontend/.env.local
```
**Backend**
```
backend/.env
```
### Staging/Prod
**Frontend**
```
frontend/.env.production
/ecs-nginx/configs/prod.json
/ecs-nginx/configs/staging.json
```

**Backend**
```
/ecs-nginx/configs/prod.json
/ecs-nginx/configs/staging.json
/ecs-nginx/cdg-stack.ts (secrets)
```