import { Link } from 'react-router-dom';
import externalLink from '../../../assets/externalLink.svg';
import externalLink from '../../../assets/externalLink.svg';

function CreateNewButton() {
    return (
        <Link to='/form'>
            <button className='create-new-button'>
                <h3 className='create-new'>Create new</h3>
                <img className='external-link' src={externalLink} alt="Icon" />
            </button>
        </Link>
    );
}

export default CreateNewButton;