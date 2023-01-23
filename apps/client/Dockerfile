FROM node:lts-alpine AS builder

RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app

RUN npm i -g turbo
COPY . .
RUN turbo prune --scope=client --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:lts-alpine AS installer

RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json .

RUN npm i

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json .

# Command reference: https://turbo.build/repo/docs/core-concepts/monorepos/filtering#include-dependents-of-matched-workspaces
RUN npm run build --filter=client...

FROM node:lts-alpine AS runner

RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

# COPY --from=installer /app/apps/client/next.config.js .
# COPY --from=installer /app/apps/client/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=installer --chown=nextjs:nodejs /app/apps/client/.next/standalone .
# COPY --from=installer --chown=nextjs:nodejs /app/apps/client/.next/static ./apps/client/.next/static

COPY --from=installer --chown=nextjs:nodejs /app .

EXPOSE 3000

CMD npm start -w client