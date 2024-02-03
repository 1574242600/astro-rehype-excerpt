import { unified } from 'unified'
import rehypeStringify from 'rehype-stringify'
import rehypeExcerpt from './excerpt'

export default (opt) => {
    return (tree, { data }) => {
        const clone = JSON.parse(JSON.stringify(tree))
        rehypeExcerpt(clone, opt)
        data.astro.frontmatter.excerpt = unified()
            .use(rehypeStringify, { allowDangerousHtml: true })
            .stringify(clone)
    }
}