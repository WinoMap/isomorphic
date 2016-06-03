export default function promiseMiddleware() {
	return next => action => {
		const { promise, type, ...rest } = action;
		if (!promise) return next(action);

		const SUCCESS = type;
		const REQUEST = type + '_REQUEST';
		const FAILURE = type + '_FAILURE';

		//	next({...rest, type: SUCCESS});
		return promise
			.then(res => {
				next({ ...rest, res, type: SUCCESS});
				return true;
			})
			.catch(error => {
				next({ ...rest, error, type: FAILURE});
				//Log failures
				console.log(error);
				return false;
			});
	};
}
