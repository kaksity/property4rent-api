import { NULL_OBJECT } from 'App/Helpers/Messages/SystemMessage'
import ApplicationSetting from 'App/Models/ApplicationSetting'

export default class ApplicationSettingsAction {
    /**
     * @description Method to get the application settings
     * @author DP
     * @static
     * @return {*} 
     * @memberof ApplicationSettingsAction
     */
    public static async getApplicationSettings() {
        let applicationSettings = await ApplicationSetting.query().first()

        if (applicationSettings !== NULL_OBJECT) {
            return applicationSettings
        }

        applicationSettings = new ApplicationSetting()

        await applicationSettings.save()

        return applicationSettings
    }
}