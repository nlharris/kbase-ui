/*global define*/
/*jslint white: true*/
define([
    'bluebird',
    'kb_common_html',
    'kb_widgetBases_dataWidget',
    'kb_service_userProfile'
], function (Promise, html, DataWidget, UserProfile) {
    function factory(config) {
        return DataWidget.make({
            runtime: config.runtime,
            title: 'User Profile Widget',
            on: {
                initialContent: function () {
                    return html.loading('Loading your profile');
                },
                fetch: function () {
                    var widget = this;
                    return Promise.try(function () {
                        var client = new UserProfile(config.runtime.getConfig('services.user_profile.url'), {
                            token: config.runtime.service('session').getAuthToken()
                        });
                        return client.get_user_profile([config.runtime.service('session').getUsername()])
                            .then(function (results) {
                                var realName = results[0].user.realname;
                                widget.setTitle('Profile for ' + realName);
                                return {
                                    name: 'person',
                                    value: {
                                        realName: realName
                                    }
                                };
                            });
                    });
                },
                render: function () {
                    if (this.hasState('person')) {
                        return '<p>Hi, I am ' + this.getState('person').realName;
                    }
                }
            }
        });
    };
    return {
        make: function (config) {
            return factory(config);
        }
    };
});