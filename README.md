# Astro-rehype-excerpt
Astro rehype transformer plugin for extracting an excerpt. similar to WordPress's excerpt functionality.  


> Not recommended. Remark and rehype plugins access the raw Markdown or MDX document frontmatter. This means that remarkPluginFrontmatter frontmatter is handled separately from your type-safe schema, and will not reflect any changes or defaults applied through Astro. Use at your own risk!    
from https://docs.astro.build/en/guides/content-collections/#modifying-frontmatter-with-remark



## Install
```bash
npm install https://github.com/1574242600/astro-rehype-excerpt
```

## Use
```js
// astro.config.mjs
import { rehypeExcerpt } from 'astro-rehype-excerpt'

export default defineConfig({
    markdown: {
        rehypePlugins: [rehypeExcerpt]
    }
})
```

### Plugin options
```ts
interface options {
    // Specifies the excerpt comment identifier to look for.
    // Default: excerpt, more, preview, or teaser
    identifier?: string 
}
```

### Astro.glob or import
```astro
---
import * as myPost from 'post.md'
---

<div set:html={myPost.frontmatter.excerpt} />
```
### Collection
```astro
---
import { getEntry } from 'astro:content'
const blogPost = await getEntry('blog', 'post-1')
const { remarkPluginFrontmatter } = await blogPost.render()
---

<div set:html={remarkPluginFrontmatter.excerpt} />
```
## example

```md
# Title
Paragraph 1.
Paragraph 2.
<!--excerpt-->
Paragraph 3.
Paragraph 4.
```
```html
<h1>Title</h1>
<p>Paragraph 1.</p>
<p>Paragraph 2.</p>
```


## Thanks.
[manovotny/remark-excerpt](https://github.com/manovotny/remark-excerpt)  
...

## LICENSE
MIT