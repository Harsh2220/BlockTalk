import { ADDRESS_REGEX } from "../constants";

const formatAddress = (address: string | undefined): string => {
    if (!address) {
        return "";
    }

    if (address.match(ADDRESS_REGEX)) {
        return `${address.slice(0, 4)}…${address.slice(
            address.length - 4,
            address.length
        )}`;
    }

    return address;
};

export default formatAddress;