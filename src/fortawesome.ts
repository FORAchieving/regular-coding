import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faUserSecret,
    faFaceSmile,
    faSpinner,
    faChevronRight,
    faCircleExclamation, // warning
    faCircleCheck, // success
    faCircleXmark, // error
    faCircleInfo, // info
    faXmark
} from "@fortawesome/free-solid-svg-icons";

const iconSets = [
    faUserSecret,
    faFaceSmile,
    faSpinner,
    faChevronRight,
    faCircleExclamation,
    faCircleCheck,
    faCircleXmark,
    faCircleInfo,
    faXmark
];

library.add(...iconSets);