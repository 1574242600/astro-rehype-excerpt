import { unified } from 'unified'
import rehypeStringify from 'rehype-stringify'
import rehypeExcerpt from './excerpt.js'

export default (opt) => {
    return (tree, { data }) => {
        const clone = JSON.parse(JSON.stringify(tree))
        rehypeExcerpt(clone, opt)
        const excerpt = data.astro.frontmatter.excerpt = {}
        excerpt.html = unified()
            .use(rehypeStringify, { allowDangerousHtml: true })
            .stringify(clone)
        excerpt.text = excerpt.html
            .replace(/<(\S*?)[^>]*>.*?|<.*? \/>/g, ' ')
            .replace(/\n/g, '')
            .replace(/\s+/g, ' ')
            .trim()
    }
}