import externalLink from '../../../assets/externalLink.svg';

function CreateNewButton() {
    return (
        <button className='create-new-button'>
            <h3 className='create-new'>Create new</h3>
            <img className='external-link' src={externalLink} alt="Icon" />
        </button>
    );
}

export default CreateNewButton;