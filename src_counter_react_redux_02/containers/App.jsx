import {connect} from 'react-redux'
import Counter from '../components/Counter'
import {increment,decrement,incrementAsync} from '../redux/action'
export default connect(
    state=>({count:state}),
    {increment,decrement,incrementAsync}
)(Counter)
