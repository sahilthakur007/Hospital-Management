exports.duplicateKeyError = (e, res) => {
    return res.status(500).json({
        message: "Some fields are duplicated",
        fields: e.keyValue
    })
}