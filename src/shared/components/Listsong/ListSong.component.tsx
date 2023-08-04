import FavoriteComponent from './Favorite.component';
import HistoryComponent from './History.component';
import PlaylistSongComponent from './PlaylistSong.component';
import { usePathname } from 'next/navigation';


function ListSongComponent() {
    const path = usePathname();
    console.log(path);
    
    const displayStep = () => {
        switch (path) {
            case '/profile/favorit':
                return <FavoriteComponent />;
            case '/profile/playlist':
                return <PlaylistSongComponent />;
            case '/profile/history':
                return <HistoryComponent />;
            default:
                return <FavoriteComponent />;
        }
    };
    return displayStep();
}

export default ListSongComponent;
