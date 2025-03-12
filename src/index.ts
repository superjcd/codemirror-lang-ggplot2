import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"


export const Ggplot2 = LRLanguage.define({
  name:'ggplot2',
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        Identifier: t.variableName,
        AesIdentifier:t.attributeName,
        value: t.attributeValue,
        GeomType: t.keyword,
        OptionType: t.keyword,
        Number: t.number,
        Boolean: t.bool,
        String: t.string,
        LineComment: t.lineComment,
        "ggplot": t.keyword,
        "aes" : t.keyword,
        "( )": t.paren
      })
    ]
  }),
  languageData: {
    commentTokens: {line: ";"}
  }
})

export function EXAMPLE() {
  return new LanguageSupport(Ggplot2)
}
