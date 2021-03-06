/*
 * @Author: your name
 * @Date: 2022-04-22 11:22:18
 * @LastEditTime: 2022-04-22 11:25:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/utils/index.ts
 */
import {require_condition} from './assert'
import * as ReactUtils from './react'
import * as Errors from './errors'

export {require_condition, ReactUtils, Errors}

export function watchPropertyChange(target:any, property:any, cb:any) {
  require_condition(
    target != null &&
    typeof property === 'string' &&
    typeof cb === 'function', 'invalid arguments')

  let cache:any = null
  if (!target.__watch_cache){
    target.__watch_cache = {}
  }
  cache = target.__watch_cache

  require_condition(cache[property] == null, `duplicated watch on ${target} 's ${property}`)
  cache[property] = cb

  let origin = target[property]

  Object.defineProperty(target, property, {
    configurable: true,

    get() {
      return origin
    },

    set(value) {
      origin = value
      if (cache[property]){
        cache[property](origin)
      }
    }
  })

  return ()=>{
    if (target.__watch_cache && target.__watch_cache[property]){
      delete target.__watch_cache[property]
      delete target[property]
      target[property] = origin
    }
  }
}

export function createPropType(validate:any) {
  // Chainable isRequired
  function checkType(isRequired:any, props:any, propName:any, componentName:any) {
    componentName = componentName || '<<anonymous>>';
    if (props[propName] == null) {
      if (isRequired) {
        return new Error(
          ("Required `" + propName + "` was not specified in ") +
          ("`" + componentName + "`.")
        );
      }
      return null;
    } else {
      return validate(props, propName, componentName);
    }
  }

  let chainedCheckType:any = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

// take from :  http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
export function hashCode(str:any) {
  if (str == null||str.length === 0) return 0
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		let char = str.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

export function pick(obj:any, keys:any) {
  require_condition(obj != null && Array.isArray(keys))

  const r = {}
  keys.forEach((e:any)=> r[e]= obj[e])
  return r
}

export function range(start:any, stop:any, step:any) {
  if (stop == null) {
    stop = start || 0;
    start = 0;
  }
  if (!step) {
    step = stop < start ? -1 : 1;
  }

  var length = Math.max(Math.ceil((stop - start) / step), 0);
  var range = Array(length);

  for (var idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
  }

  return range;
}

export {default as DateUtils} from './date'
export * from './popper-mixins'
export {IDGenerator} from './IDGenerator'