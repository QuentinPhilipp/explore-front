import polylineDecoder from 'google-polyline';
import chroma from "chroma-js"


export function getColoredPolylineFromActivity(activity) {
    const todayTwoYearsAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 2))
    const activityDate = new Date(activity.date)
    const today = new Date()

    var diffStart = activityDate-todayTwoYearsAgo;
    var diffEnd = today-todayTwoYearsAgo;

    const f = chroma.scale(['ffff00', '008ae5']);
    const percent = diffStart/diffEnd; 
    let color = '#000000'
    let opacity = 0.2
    if (percent > 0) {
        color = f(percent)
        opacity = 1;
    }
    return {color: color, opacity: opacity, positions: polylineDecoder.decode(activity.polyline)}
}
