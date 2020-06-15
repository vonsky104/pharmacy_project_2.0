import React from 'react';

const Dashboard = () => (
    <section className="section-dashboard">
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="panel-dashboard--large pharmacies">
                        <h3 className="panel-dashboard__h3">
                            Sportowcy <span>(30)</span>
                        </h3>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="col">
                            <div className="panel-dashboard--small users">
                                <h3 className="panel-dashboard__h3">
                                    Członkowie <span>(25)</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="panel-dashboard--small products">
                                <h3 className="panel-dashboard__h3">
                                    Wydarzenia <span>(312)</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export { Dashboard };
