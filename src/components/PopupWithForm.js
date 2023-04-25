function PopupWithForm ({name, title, children, isOpen, onClose}) {
    return (
        <section className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
                <div className="popup__container popup__container_edit-form">
                    <button type="button" aria-label="Закрыть" className="popup__close root__button" onClick={onClose}></button>
                    <form className="form" name={`${name}`} noValidate>
                        <h2 className="form__heading">{`${title}`}</h2>
                        {children}
                    </form>
        </div>
        </section>
    )
}

export default PopupWithForm;