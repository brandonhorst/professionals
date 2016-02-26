import {element} from 'deku'
import inlineStyle from 'inline-style'

export default function customElement (type, attributes = {}, ...children) {
  const vnode = element(type, attributes, children)

  if (attributes && attributes.style) {
    if (vnode.attributes) {
      vnode.attributes.style = inlineStyle(attributes.style)
    } else {
      vnode.attributes = {style: inlineStyle(attributes.style)}
    }
  }

  return vnode
}