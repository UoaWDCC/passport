import JoshLi_WDCC from '../assets/TeamPhotos/JoshLi_WDCC.jpeg';
import Bill from '../assets/TeamPhotos/bill_WDCC.png';
import Caleb from '../assets/TeamPhotos/Caleb_WDCC.jpg';
import Erica from '../assets/TeamPhotos/Erica_WDCC.jpg';
import Inez from '../assets/TeamPhotos/Inez_WDCC.jpg';
import Nancy from '../assets/TeamPhotos/Nancy_WDCC.jpg';
import Sebastian from '../assets/TeamPhotos/Sebastian_WDCC.jpg';
import Rithvik from '../assets/TeamPhotos/Rithvik_WDCC.jpg';
import Justin from '../assets/TeamPhotos/Justin_WDCC.jpg';
import WDCC from '../assets/WDCCDarkLogo.svg';

const MeetTheTeam = () => {
    const teamMembers = [
        {
            id: 1,
            role: 'Project Manager',
            name: 'Sebastian Thomas',
            funFact: 'can see without glasses 🥸 ',
            image: Sebastian,
            profileLink: 'https://www.linkedin.com/in/sebastian-t-60286a1bb/'
        },
        {
            id: 1,
            role: 'Tech Lead',
            name: 'Inez Chong',
            funFact: 'wubba lubba dub dub',
            image: Inez,
            profileLink: 'https://www.linkedin.com/in/inez-chong-18030b1b6/'
        },
        {
            id: 1,
            role: 'Developer',
            name: 'Rithvik',
            funFact: "i cannot see I'm legally blind (I'm not actually blind)",
            image: Rithvik,
            profileLink: 'https://www.linkedin.com/in/rithvik-sharma-008246227/'
        },
        {
            id: 1,
            role: 'Developer',
            name: 'Bill',
            funFact: 'Ran the half marathon with less than a month of training including a 2 week injury 🙂',
            image: Bill,
            profileLink: 'https://www.linkedin.com/in/bwon02/'
        },
        {
            id: 1,
            role: 'Developer',
            name: 'Josh',
            funFact: 'im a lebron fan',
            image: JoshLi_WDCC,
            profileLink: 'https://www.linkedin.com/in/joshua-li-92b87926a/'
        },
        {
            id: 1,
            role: 'Developer',
            name: 'Nancy',
            funFact: 'can see everyday',
            image: Nancy,
            profileLink: 'https://www.linkedin.com/in/nancywei463/'
        },

        {
            id: 1,
            role: 'Developer',
            name: 'Erica',
            funFact: 'cannot see most days',
            image: Erica,
            profileLink: 'https://www.linkedin.com/in/erica-ngin/'
        },
        {
            id: 1,
            role: 'Developer',
            name: 'Caleb',
            funFact: '49 20 6C 69 6B 65 20 41 53 43 49 49',
            image: Caleb,
            profileLink: 'https://www.linkedin.com/in/caleb-wharton-237193232/'
        },
        {
            id: 1,
            role: 'Developer',
            name: 'Alden',
            funFact: '',
            image: Bill,
            profileLink: ''
        },
        {
            id: 1,
            role: 'Developer',
            name: 'Justin',
            funFact: 'kate edgar is my home',
            image: Justin,
            profileLink: 'https://www.linkedin.com/in/justinfyh/'
        },
    ];

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto py-8">
                <div className="text-center">
                     <div className="text-center mt-10"> {/* Add margin bottom here */}
                        <h1 className="text-2xl font-bold text-blue-950">Meet the Team!</h1>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                    {teamMembers.map((member) => (
                        <div key={member.id} className="text-center">
                            <a href={member.profileLink} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full mx-auto"
                                />
                            </a>
                            <div className="mt-2">
                                <p className="text-sm  text-blue-600 font-bold">{member.name}</p>
                                <p className="text-sm  text-blue-950 font-semibold">{member.role}</p>
                                <p className="text-xs  text-gray-600">{member.funFact}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute top-0 right-0 mt-4 mr-4">
                    <img src={WDCC} alt="Logo" className="w-13 h-13" />
                </div>
            </div>
        </div>
    );
};

export default MeetTheTeam;
