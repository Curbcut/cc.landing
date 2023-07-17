import { useContext } from 'react'
import { LanguageContext } from '../landing'
import he from 'he'

function Translate({ str }) {
	// Use the useContext hook to get the language from the LanguageContext
	const contextValue = useContext(LanguageContext)
	const lang = contextValue.lang
	const translation_df = contextValue.configuration.translation_df

	// Find the translation in the translation_df
	const translation = translation_df.find((row) => row.en === str)

	let out = translation === undefined ? str : translation[lang]

	// Decode HTML entities if they exist in the translation
	if (out.includes('&')) {
		out = he.decode(out)
	}

	// Render HTML if it exists in the translation
	if (out.includes('<')) {
		out = <span dangerouslySetInnerHTML={{ __html: out }} />
	} else {
		out = <span>{out}</span>
	}

	// Return the translation for the language
	return out
}

export default Translate
