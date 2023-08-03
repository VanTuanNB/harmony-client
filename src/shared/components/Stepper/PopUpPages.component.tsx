import UploadSongComponent from './Upload/UpLoadSong.component';
import UploadThumnailComponent from './Upload/UploadThumnail.component';
import DetailComponent from './Detail/Detail.component';
import FinalComponent from './Final/Final.component';

interface IStep{
    step: number
}
function PopUpPageComponent({step}:IStep) {
    const displayStep = () => {
        switch (step) {
            case 1:
                return <UploadSongComponent />;
            case 2:
                return <UploadThumnailComponent />;
            case 3:
                return <DetailComponent />;
            case 4:
                return <FinalComponent />;
            default:
        }
    };
    return displayStep();
}

export default PopUpPageComponent;
