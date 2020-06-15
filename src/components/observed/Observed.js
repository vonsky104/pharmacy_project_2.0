import React from 'react';
import { Redirect } from 'react-router-dom';

const Observed = () => {
    const dataObserved = [];
    const userId = '';
    const isAuth = true;
    const removePoint = (id) => true;

    if (!this.props.isAuth) return <Redirect to={'/'} />;

    return (
        <section className="section-products">
            <div className="panel-product head">
                <span className="panel-product-photo">Zdjęcie</span>
                <span className="panel-product-name">Nazwa</span>
                <span className="panel-product-descr">Opis</span>
            </div>
            {dataObserved.map(x => {
                return (
                    <div key={x.id} className="panel-product">
                        <img className="panel-product-photo" src={x.photo_link} alt="" />
                        <span className="panel-product-name">{x.name}</span>
                        <span
                            className="panel-product-descr"
                            dangerouslySetInnerHTML={{ __html: x.description }}
                        />
                        <div
                            className="panel-close"
                            onClick={() => removePoint(x.id)}
                        >
                            <i className="fas fa-times" />
                        </div>
                    </div>
                );
            })}
        </section>
    )
};

export { Observed };
