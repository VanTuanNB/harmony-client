import FavouriteComponent from './Favourite.component';
import HistoryComponent from './History.component';
import PlaylistSongComponent from './PlaylistSong.component';
import { usePathname } from 'next/navigation';


function LibraryProfileComponent() {
    const path = usePathname();
    console.log(path);
    
    const displayStep = () => {
        switch (path) {
            case '/profile/favourite':
                return <FavouriteComponent />;
            case '/profile/playlist':
                return <PlaylistSongComponent />;
            case '/profile/history':
                return <HistoryComponent />;
            default:
                return <FavouriteComponent />;
        }
    };
    return displayStep();
}

export default LibraryProfileComponent;
