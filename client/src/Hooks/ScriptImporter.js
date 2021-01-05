import { useEffect } from 'react'

const ScriptImporter = (resourceUrl, dataTags) => {

	useEffect(() => {
		const script = document.createElement('script')
		script.src = resourceUrl

		// Generating data tags for script
		for (let [key, value] of Object.entries(dataTags)) {
			script.setAttribute(`data-${key}`, value)
		}

		script.async = true
		document.body.appendChild(script)
		return () => {
			document.body.removeChild(script)
		}
	}, [resourceUrl])

}

export default ScriptImporter