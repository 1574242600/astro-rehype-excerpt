import { join, resolve } from 'path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import { read } from 'to-vfile'
import rehypeExcerpt from '../excerpt'

const processFixture = async (name, options) => {
    const path = join(resolve(), '/src/__test__/fixtures', name)
    const file = await read(path)
    const result = await unified()
        .use(remarkParse)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use((opt) => (tree) => rehypeExcerpt(tree, opt), options)
        .use(rehypeRaw)
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(file)

    return result.toString()
}

test('should return unmodified document when no excerpt exists', async () => {
    const result = await processFixture('no-excerpt.md')

    expect(result).toMatchSnapshot()
})

test('should return excerpt using "exceprt" identifier', async () => {
    const result = await processFixture('excerpt.md')

    expect(result).toMatchSnapshot()
})

test('should return excerpt using "more" identifier', async () => {
    const result = await processFixture('more.md')

    expect(result).toMatchSnapshot()
})

test('should return excerpt using "preview" identifier', async () => {
    const result = await processFixture('preview.md')

    expect(result).toMatchSnapshot()
})

test('should return excerpt using "teaser" identifier', async () => {
    const result = await processFixture('teaser.md')

    expect(result).toMatchSnapshot()
})

test('should return excerpt using custom identifier', async () => {
    const options = {
        identifier: 'custom',
    }
    const result = await processFixture('custom.md', options)

    expect(result).toMatchSnapshot()
})

test('should return after excerpt when multiple exist', async () => {
    const result = await processFixture('multiple.md')

    expect(result).toMatchSnapshot()
})

test('should handle identifier with dashes', async () => {
    const options = {
        identifier: 'custom-with--dashes',
    }
    const result = await processFixture('custom-with-dashes.md', options)

    expect(result).toMatchSnapshot()
})

test('should handle identifier with spaces', async () => {
    const options = {
        identifier: 'custom with spaces',
    }
    const result = await processFixture('custom-with-spaces.md', options)

    expect(result).toMatchSnapshot()
})

test('should handle no spacing in exceprt comment', async () => {
    const result = await processFixture('no-space-in-comment.md')

    expect(result).toMatchSnapshot()
})

test('should handle mdx', async () => {
    const result = await processFixture('mdx.mdx')

    expect(result).toMatchSnapshot()
})