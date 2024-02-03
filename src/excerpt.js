// Modified from https://github.com/manovotny/remark-excerpt/blob/main/index.js
import { visit } from 'unist-util-visit'

const isComment = new RegExp('<!--(.*?)-->')
const getComment = new RegExp('<!--([\\s\\S]*?)-->')

const rehypeExcerpt = (tree, options = {}) => {
    const excerpts =
            options.identifier && options.identifier.length
                ? [options.identifier]
                : ['excerpt', 'more', 'preview', 'teaser']

    let excerptIndex = -1
        
    visit(tree, (node) => {
            
        if (excerptIndex === -1 && isComment.test(node.value)) {
            const comment = getComment.exec(node.value)
                
            if (comment) {
                const text = comment[1].trim()

                if (excerpts.includes(text)) {
                    excerptIndex = tree.children.indexOf(node)
                }
            }
        }
    })

    if (excerptIndex > -1) {
        tree.children.splice(excerptIndex)
    }
}

export default rehypeExcerpt