var folderPluginShared = folderPluginShared || {};
const instanceId = buildfire.getContext().instanceId;

folderPluginShared.getPluginDetails = function (pluginsInfo, pluginIds) {
    var returnPlugins = [];
    var tempPlugin = null;
    for (var id = 0; id < pluginIds.length; id++) {
        for (var i = 0; i < pluginsInfo.length; i++) {
            tempPlugin = {};
            if (pluginIds[id] == pluginsInfo[i].data.instanceId) {
                tempPlugin.instanceId = pluginsInfo[i].data.instanceId;
                if (pluginsInfo[i].data) {
                    tempPlugin.iconUrl = pluginsInfo[i].data.iconUrl;
                    tempPlugin.iconClassName = pluginsInfo[i].data.iconClassName;
                    tempPlugin.title = pluginsInfo[i].data.title;
                    tempPlugin.pluginTypeId = pluginsInfo[i].data.pluginType.token;
                    tempPlugin.folderName = pluginsInfo[i].data.pluginType.folderName;
                } else {
                    tempPlugin.iconUrl = "";
                    tempPlugin.title = "[No title]";
                }
                returnPlugins.push(tempPlugin);
            }
            tempPlugin = null;
        }
    }
    return returnPlugins;
};

folderPluginShared.getDefaultScopeData = function () {
    return {
        _buildfire: {
            plugins: {
                dataType: "pluginInstance",
                data: []
            }
        },
        content: {
            carouselImages: [],
            text: "",
            loadAllPlugins: false
        },
        design: {
            backgroundImage: null,
            logoImage: null,
            selectedLayout: 1,
            backgroundblur: 0
        }
    };
};

folderPluginShared.getLayouts = function () {
    return [
        "./layouts/layout1.png",
        "./layouts/layout2.png",
        "./layouts/layout3.png",
        "./layouts/layout4.png",
        "./layouts/layout5.png",
        "./layouts/layout6.png",
        "./layouts/layout7.png",
        "./layouts/layout8.png",
    ];
};

folderPluginShared.save = function (newObj) {
    const sameInstance = validateSameInstance();
    if (!sameInstance) return;
    buildfire.datastore.save(newObj, function (err, result) {
        if (err || !result) {
            console.error('Error saving the widget details: ', err);
        }
        else {
            console.info('Widget details saved');
        }
    });
};

folderPluginShared.digest = function ($scope) {
    if (!$scope.$$phase && !$scope.$root.$$phase) {
        $scope.$apply();
    }
};

/**
 * @function validateSameInstance
 * this function is added to avoid affects on multi instances and home screen, 
 * which is happening when update something then navigate back to home screen before getting db callback
 * 
 * for full info: https://buildfire.atlassian.net/browse/PLUG-649, https://buildfire.atlassian.net/browse/PLUG-1923
 */
function validateSameInstance() {
    return buildfire.getContext().instanceId === instanceId;
}