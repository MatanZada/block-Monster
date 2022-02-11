$(function () {
    $('[data-role="save-movie"]').click(() => {
        let data = {
            name: $('[name="movie-name"]').val(),
            country: $('[name="movie-country"]').val(),
            cast: $('[name="movie-cast"]').val(),
            date: $('[name="movie-date"]').val(),
        }
        $.post('/addMovie', data, () => {
            populateMovie(data)
        })

        function populateMovie(data) {
            $.each(data, (key, value) => {
                const div = $(`<div data-role=${key}>`)
                div.append(`<span>${value}</span>`)
                $('[data-role=movie-holder]').append(div)
            })
        }
    })
})