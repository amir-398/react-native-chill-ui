const propsDetector = (props: any, key: string) => Object.keys(props).some(propKey => propKey === key);

export default propsDetector;
