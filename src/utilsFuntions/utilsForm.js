

const URLREGEX = /^(?:https?:\/\/)?(?:www\.)?[^\s.]+\.[^\s]{2,}$/;


export const resetValues = (list = [{ name: "", value: "" }], setValue) => {
    for (const { name, value } of list) {
      setValue(name, value);
    }
}

export const validateRegexURL = (url) => URLREGEX.test(url)


const option = (styles, state)=>({
  ...styles,
  backgroundColor: state.isDisabled ? undefined : state.isFocused && 'rgba(40, 52, 62, 0.07)',
  color: '#242d49',
  borderColor: '#BBBBBB',
  borderWidth: 1,
  borderBottomStyle: 'solid',
  fontSize:13
})

const control = (styles) =>({
  ...styles,
  borderRadius: 8,
  minHeight:  45,
  backgroundColor:'rgba(40, 52, 62, 0.07)',
  border: 'none',
  boxShadow:'none',
  outline:"none",
})

const placeholder = (styles) =>({
  ...styles,
  color: '#242d49',
  
  fontSize:13
})

const dropdownIndicator = (styles)=>({
  ...styles,
  color: "#424242",
})

const menuList = (styles) =>({
  ...styles,
  padding: 0,
  borderRadius:12
})

const menu = (styles) =>({
  ...styles,
  borderRadius: 12,
  border: '1px solid #D8D8D8',
  zIndex:3,
  // boxShadow: '0px 5px 12px rgba(90, 97, 105, 0.1), 0px 0px 35px rgba(90, 97, 105, 0.1)',
})

const indicatorSeparator =  ()=>({
  display: 'none',
})

export const stylesReactSelect = {
  option: option,
  control: control,
  placeholder: placeholder,
  indicatorSeparator: indicatorSeparator,
  dropdownIndicator: dropdownIndicator,
  menuList: menuList,
  menu: menu,
}

