Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    padding: '20 20 20 20',
    items: [
    ],
    padding: '20 20 20 20',
    
    launch: function() {
        Ext.create('Rally.data.wsapi.Store', {
            model: 'User',
            autoLoad: true,
            filters: [
                {
                    property: 'TeamMemberships',
                    operator: 'contains',
                    value: Rally.util.Ref.getRelativeUri(this.getContext().getProject())
                }
            ],
            listeners: {
                load: this._addBoard,
                scope: this
            }
        }); 
    },

    _addBoard: function() {
        var columns = [
            {
                value: null,
                columnHeaderConfig: {
                    headerData: {planEstimate: 'Unestimated'}
                }
            }
        ];
        
        var estimateValues = [0, 1, 2, 3, 5, 8, 13, 20];

        _.each(estimateValues, function(estimate) {
            columns.push({
                value: estimate,
                columnHeaderConfig: {
                    headerData: {planEstimate: estimate}
                }
            });
        });
        
        this.add({
            xtype: 'rallycardboard',
            types: ['User Story'],
            attribute: 'PlanEstimate',
            context: this.getContext(),
            columnConfig: {
                columnHeaderConfig: {
                    headerTpl: '{planEstimate}'
                }
            },
            storeConfig: {
                filters: [
                    {
                        property: 'Iteration',
                        operation: '=',
                        value: ''
                    },
                    {
                        property: 'DirectChildrenCount',
                        operation: '=',
                        value: '0'
                    }
                ]
            },
          
            columns: columns
        });
    }
    
});
