function loadMembers(userHandle) {
    // Load the user's avatar image from the paramter userHandle.
    var masterElement = $('.member').first().clone();
    // This will direct the user to the member's profile page.
    $(masterElement).attr('href', "profile.html#" + userHandle);
    // Avatar image replaces the URL.
    $(masterElement).children('img').attr('src', "https://www.fillmurray.com/20" + Math.floor(Math.random() * 10) + "/20" + Math.floor(Math.random() * 10));
    // Name goes here. Might utilize IRL name.
    $($(masterElement).children('.member-name').get(0)).text(userHandle);

    // Filler attributes
    $($(masterElement).children('.member-name').get(1)).text("C.E.O.");
    $($(masterElement).children('.member-name').get(2)).text(Math.floor(Math.random() * 888) + " Fame");
    $($(masterElement).children('.member-name').get(3)).text(Math.floor(Math.random() * 88) + " Collaborations");
    $("#proj-team").append($(masterElement));
}

$(document).ready(function() {
    // Hiding buttons at ready
    $('#submit-btn').css('display', 'none');
    $('#text-box').css('display', 'none');

    // Load project name.
    $('#project-name').text('U●Start ');
    // Load project description
    $('#desc').text('U•Start’s goal is to build a creation platform where college students can share their ideas for projects with other students on the U•Start network in hopes of finding students with the skillset they need to help create their projects together. It will also allow students without ideas to browse through projects and contact students with ideas about joining the projects that interest them.\
        The team in U⋅Start is connected by one shared objective: to make a platform that can help students create projects with aspiring entrepreneurs and have access to a network of professionals to gain experience in their field of interest. In a world where there are seemingly endless networking sites, we aim to differentiate ourselves by providing students access to experienced mentors to help ignite their creative fuel.\
        The beauty of U⋅Start is in the name. We need U to help students create together in ways that are only possible in our diverse network. For us to achieve our goal of helping students achieve theirs, please sign up.');

    // Load to proj-about 
    // This is the longer desc
    $('#about-text').html('<p>U•Start’s goal is to build a creation platform where college students can share their ideas for projects with other students on the U•Start network in hopes of finding students with the skillset they need to help create their projects together. It will also allow students without ideas to browse through projects and contact students with ideas about joining the projects that interest them. Most internships have become highly competitive and often result in more paperwork than actual work related the student’s field of study. U•Start will finally allow students of all fields of study to gain experience by working on projects the peak their interest and potentially grow it to beyond just a project. The beauty in U•Start is, unlike the platforms that we are used to, it is not niche based in just one field. It has been created with all skillsets in mind. For example a solo musician can find fellow musician, create a band, find a sound engineer and create a demo much faster than before. A coder can find a website using new coding languages that they wanted to learn and gain experience with that new language for their resume.</p>\
<p>Students will no longer need to be limited to the people that they know within their major or even their university, U•Start allows for cross-university communication between students. Many universities and colleges have multiples campuses with different specialties, with this platform students will finally have the ability to reach out to other campuses and universities, to find the students with the specialized skillsets they need for projects.</p>\
<p>U•Start was created in hopes of helping students all around the world give life to their ideas and help them find the resources they need. Too many ideas have lost or given up on that could have made a major difference in the world, due to not having the resources or skillsets needed to create them. \
</p>');



    // Load the about page; well, its current description at least.
    // CKEDITOR.instances['text-box'].setData('Lorem ipsum dolor sit amet, possim accommodare ne eos. Ea sit illud mentitum. Vel et choro ubique nostrud, eu diam homero soleat sea.');

    // For submission, the value of the editor can be retrieved with the following line.
    // console.log("About Editor: " + CKEDITOR.instances['text-box'].getData());

    // Wall Load; dunno, ask the other guys.

    // Load members of the project.
    for (i = 1; i < 31; i++) {
        loadMembers("Mac Frappy Frapalicious #" + i);
    }

    // Load links. Modify 'layout_links.js' accordingly.
    importLinks();

    // GUI.

    $('.member').hover(function() {
        $(this).children('.member-name').stop(true, false).slideDown('fast');
    }, function() {
        $(this).children('.member-name').delay('slow').slideUp('fast');
    });
    $('#btn2').click(function(e) {
        e.preventDefault();
        $button = $(this);
        if ($button.hasClass('following')) {
            //$.ajax(); Do Unfollow

            $button.removeClass('following');
            $button.removeClass('unfollow');
            $button.html('Follow  <span id="followers">1.5K</span>');
        } else {

            // $.ajax(); Do Follow

            $button.addClass('following');
            $button.html('Following  <span id="followers">1.5K</span>');

            // $button.text('Following');
        }
    });

    $('#btn2').hover(function() {
        $button = $(this);
        if ($button.hasClass('following')) {
            $button.addClass('unfollow');
            $button.text('Unfollow');
        }
    }, function() {
        if ($button.hasClass('following')) {
            $button.removeClass('unfollow');
            $button.html('Following  <span id="followers">1.5K</span>');

            // $button.text('Following');
        }
    });

});