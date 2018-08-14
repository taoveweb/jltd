
const isNotNull = (param:any) =>{
	if (typeof (param) == "undefined" || param == null) {
		return false;
	}
	return true;
}

const isNull = (param:any) =>{
	if (typeof (param) == "undefined" || param == null) {
		return true;
	}
	return false;
}

const isNotspace = (param:any) =>{
	 var pattern=/^[ ]*$/;
	if (!pattern.test(param)) {
		return false;
	}
	return true;
}


const isNotEmpty = (param:any) =>{
	if (!isNotNull(param) || param == '') {
		return false;
	}
	return true;
}

const isEmpty = (param:any) =>{
	if (isNull(param) || param == '') {
		return true;
	}
	return false;
}
export default {
	isNotEmpty,
	isNotNull,
	isNotspace,
	isNull,
	isEmpty,
};