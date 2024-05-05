import { createSeedClient } from '@snaplet/seed'
import { copycat } from '@snaplet/copycat'

const seed = await createSeedClient();

await seed.posts([{
  title: "There is a lot of snow around here!"
  createdBy: {
    email: (ctx) =>
      copycat.email(ctx.seed, {
        domain: 'acme.org',
      })
  },
  comments: (x) => x(3)
}])