import toTitleCase from "@/lib/toTitleCase";
import moment from "moment";

const vehicleRequestNameFormatter = vehicleRequest => {
    const partOne = vehicleRequest.year_high ?? vehicleRequest.year_low ?? toTitleCase(vehicleRequest.new_or_used);
    const partTwo = vehicleRequest.make ?? toTitleCase(vehicleRequest.budget_or_monthly_payment) ?? toTitleCase(vehicleRequest.size);
    const partThree = vehicleRequest.model ?? toTitleCase(vehicleRequest.body_style);

    if (partOne === null && partTwo === null && partThree === null) {
        return 'Vehicle Request from ' + moment(vehicleRequest.created_at).format("MMMM Do YYYY, h:mm:ss a");
    }

    let formattedValue = '';
    formattedValue += partOne ? partOne + ' ' : '';
    formattedValue += partTwo ? partTwo + ' ' : '';
    formattedValue += partThree ? partThree + ' ' : '';

    return formattedValue;

}

export default vehicleRequestNameFormatter;
