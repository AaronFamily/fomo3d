import React from 'react'
import axios from 'axios'
import qs from 'qs'

const requestBody = ['POST', 'PUT', 'PATCH']
const restfulApi = ['GET', 'HEAD', 'POST', 'DELETE', 'PUT', 'PATCH']
let count = 0

let defaultOptions = {
  headers: {},
  params: {},
  data: {},
  timeout: 8000,
  auth: {},
  responseType: 'text',
  validateStatus: () => true
}

const httpFactory = method => (url, params = {}, axiosOptions, isLoading = true) => {
	const options = { ...defaultOptions, ...axiosOptions, method, url }

    
	if (requestBody.includes(method.toUpperCase())) {
        options.data = params
	} else { 
		const query = qs.stringify(params)

		if (query) url += `?${query}`
	}

	return new Promise ((resolve, reject) => {
        const startDate = Date.now()
		if (count <= 0) {
            // 打开loading
			// isLoading && 
		}

        isLoading && count++
        
        console.log(options)

		axios(options)
		.then(result => {
            console.log(result.data)
            if (result.status !== 200) {
                return reject(result.data || '接口错误')
            } else {
                resolve(result.data)
            }
        })
        .catch(e => {
            console.log('请求失败', e)
			reject('Server Error', e)
		})
        .finally(() => {
            isLoading && count--

            const poorDate = Date.now() - startDate

			if (count <= 0) {
				if (poorDate  < 400) {
                    // 延迟关闭loading
					// setTimeout(() => global.store.dispatch(loadingClose()) , 400)
				} else {
                    // 关闭loading
					// global.store.dispatch(loadingClose())
				}
			}
        })
	})
}

const methodsFactory = (axiosOptions) => {
    const collection = {}
    restfulApi.forEach(method => {
        collection[method.toLowerCase()] = httpFactory(method, axiosOptions)
    })

    collection.all = (...arg) => {
        arg.filter(fn => typeof fn === 'function' && fn.then)

        return Promise.all(arg)
    }

    collection.race = (...arg) => {
        arg.filter(fn => typeof fn === 'function' && fn.then)

        return Promise.race(arg)
    }

    return collection
}


export default axiosOptions => Target => {

    const methods = methodsFactory(axiosOptions)

    return class extends React.Component {
        render () {
            const oldProps = this.props
            return <Target {...oldProps} {...methods} />
        }
    }
}