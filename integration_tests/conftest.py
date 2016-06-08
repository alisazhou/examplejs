## import datetime

import pytest
from browser_fixture import BaseBrowser, get_browser_fixture_of_class

browser = get_browser_fixture_of_class(BaseBrowser)
pytest.yield_fixture()(browser)


@pytest.yield_fixture()
def normal_user(django_user_model):
    user = django_user_model.objects.create(username='user1')
    user.set_password('password')
    user.save()
    yield user
    # do i need this? maybe if we don't kill db between tests?
    user.delete()
