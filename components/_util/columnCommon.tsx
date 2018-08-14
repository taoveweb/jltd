const formatterString = (val:any) => {
	return (<div>{val == null ? "" : val}</div>);
}

export default {
	formatterString,
};