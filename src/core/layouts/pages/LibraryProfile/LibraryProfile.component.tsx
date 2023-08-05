import FavouriteComponent from './Favourite.component';
import HistoryComponent from './History.component';
import PlaylistProfileComponent from './PlaylistProfile.component';
import { usePathname } from 'next/navigation';


function LibraryProfileComponent() {
    const path = usePathname();
    console.log(path);
    
    const displayStep = () => {
        switch (path) {
            case '/profile/favourite':
                return <FavouriteComponent />;
            case '/profile/playlist':
                return <PlaylistProfileComponent />;
            case '/profile/history':
                return <HistoryComponent />;
            default:
                return <FavouriteComponent />;
        }
    };
    return displayStep();
}

export default LibraryProfileComponent;
