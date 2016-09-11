import pytest
from browser_fixture import BaseBrowser, setup_pytest_browser_fixture


# sometimes this fixture will be overridden with new browser using
# BaseBrowser + Mixins
browser = setup_pytest_browser_fixture(BaseBrowser)

@pytest.yield_fixture()
def normal_user(django_user_model):
    user = django_user_model.objects.create(username='user1')
    user.set_password('password')
    user.save()
    yield user
    # do i need this? maybe if we don't kill db between tests?
    user.delete()

